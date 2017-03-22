scalar.ui.launcher = function () {
  this.config = scalar.ui.launcher.config;

  scalar.exec('gsettings get org.gnome.desktop.interface icon-theme', function (output) {
    scalar.ui.launcher.config.ICON_THEME = "/usr/share/icons/" + output.split("'")[1] + "/48x48/apps/";
  });


  setInterval(function () {
    scalar.exec('cd com/bash && bash applicationList.sh', function (output) {
      if (output !== window.appTemp) {
        window.appTemp = output;
        this.apps = eval('[' + output + ']');
        this.current = this.apps[this.apps.length - 1];

        this.current = this.current.active.slice(this.current.active.indexOf("="), this.current.active.length - 1).replace("=", '').trim().replace('"', '');
        document.querySelector('#launcher').innerHTML = "";
        for (var i = 0; i < this.apps.length - 1; i++) {
          if (this.apps[i].title != 'scalar' && this.apps[i].command[0] != 'scalar') {
            if (this.apps[i].title == this.current) {
              scalar.ui.append('#launcher', scalar.ui.createElement('div', { 'id': 'app-' + i, class: 'app active', 'text': this.apps[i].command[0].slice(0, 1).toUpperCase() }));
              //this.scalar.ui.append('#app-' + i, scalar.ui.createElement('img', { 'id': 'icon-' + i, 'src': this.iconTheme + this.apps[i].command[0] + '.svg' }));
              document.querySelector('#app-' + i).setAttribute('onclick', `scalar.exec('wmctrl -R "` + this.apps[i].title + `"',function(){})`);
            } else {
              scalar.ui.append('#launcher', scalar.ui.createElement('div', { 'id': 'app-' + i, class: 'app', 'text': this.apps[i].command[0].slice(0, 1).toUpperCase() }));
              //this.scalar.ui.append('#app-' + i, scalar.ui.createElement('img', { 'id': 'icon-' + i, 'src': this.iconTheme + this.apps[i].command[0] + '.svg' }));
              document.querySelector('#app-' + i).setAttribute('onclick', `scalar.exec('wmctrl -R "` + this.apps[i].title + `"',function(){})`);
            }
          }
        }
      }
    });
  }, 250);
};

scalar.ui.launcher.config = {
  ICON_THEME: ''
};
scalar.ui.launcher.prototype = {
};


scalar.ui.launcher = new scalar.ui.launcher();