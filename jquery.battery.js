(function ($) {
    var Battery = function() {
        this.settings = {};
        this.defaults = {
            errors: {
                browser_not_supported: "This browser does not support jQuery.battery."
            }
        };

        this.init = function(options) {
            // By default the options shoudl contain
            //   - charging (bool)
            //   - chargingTime (double)
            //   - dischargingTime (double)
            //   - level (double)
            //
            // I call the next variable batNav because I like the
            // Batman-like spin it gives it.

            this.settings = $.extend(true, this.defaults, options);

            if (!navigator.battery && !navigator.webkitBattery && !navigator.mozBattery) {
                $.error(
                    this.settings.errors.browser_not_supported
                );
                return this;
            }

            this.batNav = navigator.battery || navigator.webkitBattery || navigator.mozBattery;

            this.level           = this.batNav.level;
            this.charging        = this.batNav.charging;
            this.chargingTime    = this.batNav.chargingTime;
            this.dischargingTime = this.batNav.dischargingTime;

            return this;
        }

        this.change = function(type, callback) {
            if (typeof(callback) != 'function') {
                // No callback, no event.
                return false;
            }

            // Types are:
            //   - level
            //   - charging
            //   - chargingTime
            //   - discharging
            //   - dischargingTime
            switch (type.toLowerCase()) {
                case 'level':
                    this.batNav.onlevelchange = callback.call($(this)); 
                    break;
                case 'charging':
                    this.batNav.onchargingchange = callback.call($(this));
                    break;
                case 'chargingTime':
                    this.batNav.onchargingtimechange = callback.call($(this));
                    break;
                case 'dischargingTime':
                    this.batNav.ondischargingtimechange = callback.call($(this));
                    break;
                default:
                    break;
            }

            return this;
        }
    };

    $.battery = function(options) {
        var b = new Battery();
        return b.init()
    };
})(jQuery);
