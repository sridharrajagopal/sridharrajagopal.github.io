---
layout: page
title: Sensor Tag Logger
description: Log data from TI Sensor Tag over BLE
img: assets/img/SensorTagLogger.png
importance: 3
category: maker
---

<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/IMG_8272.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/IMG_8267.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
        </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/IMG_8268.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sensor Tag Logger
</div>

**Summary**

TI’s Sensor Tag consists of a smorgasbord of sensors packed on a board
powered by a coin-cell battery with Bluetooth LE (ambient and IR
temperature, humidity, barometer, gyroscope, accelerometer, compass in
the version I had – current versions sport additional sensors).

I created a Sensor Tag Logger board as a learning exercise (schematic
design, board layout, soldering, SMT, firmware, bluetooth LE). It used
an Arduino Pro Mini and a Bluegiga BLE112 bluetooth module to query
the Sensor Tag for appropriate data and log it to an SD card. It used
an RTC for timekeeping for logging, and an interface with push buttons
and LEDs that was used to toggle on/off different sensor logging. A
shift register was used to help manage the IO (the project pretty much
maxed out the available ports of the Arduino Pro Mini). The hardware
schematic and firmware are open sourced on GitHub.

**Background Context**

I saw that someone had used the SensorTag to collect data from an
amateur rocket launch
(http://makezine.com/projects/iphone-flies-on-a-rocket-collect-and-analyze-data/). You
had to either fly an iPhone with the rocket, or limit the data
collection to at best 300 feet of flight data (the best case range for
Bluetooth LE).

There are so many different scenarios under which a
SensorTag can be used to collect data. In all of these cases, it would
be great to untether the SensorTag from your smart phone – and let it
collect data even when you are not there. Thus was born the Arduino
Bluetooth LE Logger for TI Sensor Tag! It connects over Bluetooth LE
(BLE) in master mode to the TI Sensor Tag, and turns on notifications
for the characteristics you have selected (via push buttons), and
starts logging the data to a microSD card, along with the timestamp,
in a Comma-separated value (CSV) format, for easy importing into
spreadsheets for additional processing and graphing.

** Supplementary Links **

Sensor Tag Logger firmware - (https://github.com/sridharrajagopal/SensorTagLogger)
Sensor Tag Logger writeup with additional details -
(https://bayareamaker.wordpress.com/2015/09/15/arduino-bluetooth-le-logger-for-ti-sensortag-and-others/)

** Build Process **

I learned to use Eagle CAD for schematic and board design. I also had
to create custom library components. I used OSH Park to make the PCB,
and hand soldered all the components (including SMT components and
chips) - another learning experience!
