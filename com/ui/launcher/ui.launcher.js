scalar.ui.launcher = function () {
  this.config = scalar.ui.launcher.config;
  scalar.exec('gsettings get org.gnome.desktop.interface icon-theme', function (output) {
    window.iconTheme = "/usr/share/icons/" + output.split("'")[1] + "/48x48/apps/";
  });


  setInterval(function () {
    scalar.exec('cd com/bash && bash applicationList.sh', function (output) {
      output = '[' + output.slice(0, output.length - 2) + ']';
      window.activeApps = eval(output);
      document.querySelector('#launcher').innerHTML = "";
      for (var i = 0; i < window.activeApps.length; i++) {
        scalar.ui.append('#launcher', scalar.ui.createElement('div', { 'id': 'app-' + i, 'text': window.activeApps[i].title }));
        window.scalar.ui.append('#app-' + i, scalar.ui.createElement('img', { 'id': 'icon-' + i, 'src': window.iconTheme + window.activeApps[i].command[0] + '.svg' }));
        document.querySelector('#app-' + i).setAttribute('onclick', `scalar.exec('wmctrl -R "` + window.activeApps[i].title + `"',function(){})`);
      }
    });
  }, 5000);
};

scalar.ui.launcher.config = {

};
scalar.ui.launcher.prototype = {

};


scalar.ui.launcher = new scalar.ui.launcher();