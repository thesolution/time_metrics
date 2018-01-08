# time_metrics
time_metrics is designed to publish time as a statsd gauge for Grafana Alert quiet times
This docker container publishes the following metrics to statsd at 1 minute intervals:
* `time.{time zone}.day`
* `time.{time zone}.hour`
* `time.{time zone}.weekDayHour`

`weekDayHour` is `0` on Saturday and Sunday and the hour Monday through Friday.

# Docker Compose
* To test this container locally run `docker-compose up`.  
* After making local changes to the app run `docker-compose build`.
* After making volume changes to the `Graphite` or `Grafana` images, run `docker-compose rm graphite|grafana`

# Settings
There are two setting for this container: time zone and statsd hostname/ip

The defaults are:
* TIME_ZONE=America/New_York
* STATSD_HOST=graphite


# Time Zones
Time zone format is input in the linux format. Example `America/New_York` for `EST/EDT`.  Check [moment-timezone](https://momentjs.com/timezone/) for more information.


