import json
from pathlib import Path
from datetime import datetime, timezone
from dateutil import parser
from feedgen.feed import FeedGenerator

# Locate directories relative to this script's position
SCRIPT_DIR = Path(__file__).parent.resolve()
REPO_ROOT = SCRIPT_DIR.parent
JSON_FILE = SCRIPT_DIR / "hackster_projects.json"
OUTPUT_FILE = REPO_ROOT / "assets" / "xml" / "hackster_projects.xml"

def load_projects(file_path):
    """Loads project metadata from JSON."""
    if not file_path.exists():
        raise FileNotFoundError(f"JSON data file not found: {file_path}")

    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def parse_date(date_str):
    """Parses date string or falls back to current UTC time."""
    if date_str:
        try:
            dt = parser.parse(date_str)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt
        except Exception:
            pass
    return datetime.now(timezone.utc)

def generate_rss(output_filename):
    """Generates an RSS 2.0 XML feed directly from JSON metadata without HTTP calls."""
    projects = load_projects(JSON_FILE)

    fg = FeedGenerator()
    fg.title("Sridhar Rajagopal's Hackster Projects")
    fg.link(href="https://www.hackster.io/sridhar-rajagopal", rel="alternate")
    fg.description("Static RSS feed of hardware and maker projects by Sridhar Rajagopal.")
    fg.language("en")
    fg.pubDate(datetime.now(timezone.utc))

    print(f"Generating RSS feed for {len(projects)} projects from {JSON_FILE.name}...")

    for proj in projects:
        url = proj.get("url")
        title = proj.get("title", "Untitled Project")
        description = proj.get("description", "")
        pub_date = parse_date(proj.get("pubDate"))

        fe = fg.add_entry()
        fe.id(url)
        fe.title(title)
        fe.link(href=url)
        fe.description(description)
        fe.published(pub_date)

    # Ensure assets/xml/ output directory exists
    output_path = Path(output_filename)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    fg.rss_file(str(output_path), pretty=True)
    print(f"Successfully wrote RSS feed to: {output_path}")

if __name__ == "__main__":
    generate_rss(OUTPUT_FILE)
