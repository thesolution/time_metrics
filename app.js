var moment = require('moment-timezone');
var statsdClient = require('statsd-client');
var tz = process.env.TIME_ZONE
var statsdHost = process.env.STATSD_HOST
var SUNDAY = 0;
var SATURDAY = 6;
var statsd = new statsdClient({host:statsdHost});
var logMetrics = ()=>{
    var now = moment().tz(tz);
    var zone = now.zoneAbbr();
    var weekDay = now.day();
    statsd.gauge(`time.${zone}.day`, weekDay);
    statsd.gauge(`time.${zone}.hour`, now.hour());
    if ( weekDay == SUNDAY || weekDay == SATURDAY) {
        statsd.gauge(`time.${zone}.weekDayHour`, 0);
    } else {
        statsd.gauge(`time.${zone}.hour`, now.hour());
    }
    
};
var minutely = setInterval(logMetrics , 1000 * 60);
logMetrics();
process.openStdin().on("keypress", function(chunk, key) {
    if(key && key.name === "c" && key.ctrl) {
      console.log("shutdown");
      statsd.close();
      clearInterval(minutely);
      process.exit();
    }
  });
