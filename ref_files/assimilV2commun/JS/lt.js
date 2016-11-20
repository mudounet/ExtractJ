WimbaContextPath = "/wimba";

WimbaHostname = "cours.toutapprendre.com";

function w_lt_compare(p){
  w_s(p,"name","compare",false);
  w_s(p,"id","compare",false);
  w_s(p,"pc_code","Compare.class",false);
  w_s(p,"mac_code","Compare.class",false);
  w_s(p,"java2_code","Compare.class",false);
  w_s(p,"context_path",WimbaContextPath,false);
  w_write(p);
}

function w_lt_karaoke(p)
{
  w_s(p,"name","karaoke",false);
  w_s(p,"id","karaoke",false);
  w_s(p,"pc_code","Karaoke.class",false);
  w_s(p,"mac_code","Karaoke.class",false);
  w_s(p,"java2_code","Karaoke.class",false);
  w_s(p,"context_path",WimbaContextPath,false);
  w_write(p);
}

// Macintosh.
function detectOSX() {
  if ((navigator.userAgent.indexOf("Mac OS X") > 0) || 
      (navigator.userAgent.indexOf("MacOS X") > 0) || 
      (navigator.userAgent.indexOf("MacOSX") > 0) ||
      ( (navigator.userAgent.indexOf("MSIE") > 0) && 
        (navigator.userAgent.indexOf("MSIE 4.") < 0) && 
        (navigator.userAgent.indexOf("MSIE 5.0") < 0) &&
        (navigator.userAgent.indexOf("MSIE 5.13") < 0) &&
        (navigator.userAgent.indexOf("MSIE 5.14") < 0) )
      )  {
    return(true);
  } else {
    return(false);
  }
}

function w_write(p)
{
  w_s(p,"align","baseline",false);
  w_s(p,"pc_codebase","http://" + WimbaHostname + "/",false);
  w_s(p,"mac_codebase","http://" + WimbaHostname + "/",false);
  w_s(p,"java2_codebase","http://" + WimbaHostname + "/",false);

  w_s(p,"cabbase",p.context_path + "/code/lt.cab",false);
  w_s(p,"mac_archive",p.context_path + "/code/maclt.jar",false);
  w_s(p,"macjava2_archive",p.context_path + "/code/macjava2lt.jar",false);
  w_s(p,"java2_archive",p.context_path + "/code/java2lt.jar",false);
  w_s(p,"pc_archive",p.context_path + "/code/lt.jar",false);

  if (navigator.appVersion.indexOf("Mac") != -1) {
    if (detectOSX()) {
      p.archive=p.macjava2_archive;
    } else {
      p.archive=p.mac_archive;
    }
    p.code = p.mac_code;
    p.codebase = p.mac_codebase; 

    if ((navigator.appName.indexOf("Netscape") != -1) && 
        (navigator.appVersion.indexOf("4.") != -1)) {

      if (navigator.plugins["MRJ Java Plugin"]) {
        w_embed(p);
      } else {
        document.write("<H2><FONT COLOR='#FF0000'>");
        document.write("We are sorry, you cannot use Wimba on the Macintosh with the Netscape browser you are using.<BR>");
        document.write("You can either install the MRJ Plugin (find help at the <A HREF='http://www.wimba.com/help/mac/macHelp.html'>Wimba Mac Help page</A> or use another browser (Netscape 6 or later, Internet Explorer 4.5 or later, iCab 2 or later).");
        document.writeln("</FONT></H2>");
      }
    } else {
      w_applet(p);
    }
  }

  // Win32.
  else if (navigator.appVersion.indexOf("Win") != -1) {
    whichTag = "APPLET";
    // We have to consider IE first because it doesn't support the navigator.plugins array.
    if (navigator.appName.indexOf("Internet Explorer") != -1 ) {
      // We write a short Visual Basic script
      document.writeln('<SCRIPT LANGUAGE="VBscript" TYPE="text/vbscript">');
      document.writeln('Function HasJavaPlugin()');
      document.writeln('  On Error Resume Next');

      // Support for CreateObject function was added in VBScript 2.
      document.writeln('  If (ScriptEngineMajorVersion>=2) Then');
      document.writeln('    HasJavaPlugin141 = IsObject(CreateObject("JavaPlugin"))');
      document.writeln('    HasJavaPlugin13  = IsObject(CreateObject("JavaSoft.JavaBeansBridge"))');
      document.writeln('    HasJavaPlugin131 = IsObject(CreateObject("JavaSoft.JavaBeansBridge.1"))');
      document.writeln('    HasJavaPlugin = HasJavaPlugin141 Or HasJavaPlugin13 Or HasJavaPlugin131');
      document.writeln('  Else');
      document.writeln('    HasJavaPlugin = False');
      document.writeln('  End If');
      document.writeln('End Function');
      document.writeln('<\/SCRIPT>');
      // We call the function in the VB script from JavaScript.
      if ( HasJavaPlugin() ) {
        whichTag = "OBJECT";
      }
    }

    // Netscape: use EMBED if have Sun's Java 2 plugin.
    else if (navigator.appName.indexOf("Netscape") != -1) {
      if ( navigator.plugins && navigator.plugins["Java Plug-in"] && (navigator.plugins["Java Plug-in"].description[15] > 1) ) {
        whichTag = "EMBED";
      }
    }

    // All other browsers: use APPLET tag.
    if ( whichTag == "EMBED" ) {
      p.archive=p.java2_archive;
      p.code = p.java2_code;
      p.codebase = p.java2_codebase; 
      w_embed(p);
    }
    else if ( whichTag == "OBJECT" ) {
      p.archive=p.java2_archive;
      p.code = p.java2_code;
      p.codebase = p.java2_codebase; 
      w_object(p);
    }
    else {
      if (navigator.appName.indexOf("Netscape") != -1) {
        p.archive=p.pc_archive;
        p.code = p.pc_code;
        p.codebase = p.pc_codebase; 
      }
      // If we're not using Netscape, we assume that the jar should
      // be for Sun's plugin. (If it's IE without the plugin, it
      // will ignore the jar entirely and download the cab file.)
      else {
        p.archive=p.java2_archive;
        p.code = p.java2_code;
        p.codebase = p.java2_codebase; 
      }
      w_applet(p);
    }
  }
  // Linux, Solaris, etc. (probably Netscape)
  else {
    // Keep the applets happy under Linux.
    w_s(p, "forum_id", p.board_id, false);
    if ( navigator.plugins && navigator.plugins["Java Plug-in"] && (navigator.plugins["Java Plug-in"].description[15] > 1) ) {
      p.archive = p.java2_archive;
      p.code = p.java2_code;
      p.codebase = p.java2_codebase;
    }
    else {
      p.archive = p.pc_archive;
      p.code = p.pc_code;
      p.codebase = p.pc_codebase;
    }
    w_applet(p);
  }
}

function w_s(o,name,value,force) {
  if (force || o[name]==null) {
    o[name]=value;
  }
}

function w_object(p) {
  document.write("<OBJECT ");
  document.write("CLASSID='clsid:8AD9C840-044E-11D1-B3E9-00805F499D93' ");
  document.writeln("WIDTH = '" + p.width + "' ");
  document.writeln("HEIGHT = '" + p.height+ "' ");
  document.writeln("CODEBASE = 'http://java.sun.com/getjava/download.html' ");
  document.writeln("STANDBY = 'voice board loading...' ");
  document.writeln("ARCHIVE = '" + p.archive + "' ");
  document.writeln("TYPE = 'application/x-java-applet' ");
  document.write(">");
  // These result in a bug in Netscape 4.
  // Why take the chance of bugs with other browsers?
  p.width = null;
  p.height = null;

  for (i in p) {
    if (p[i]!=null){
      document.writeln("<param name='"+i+"' value='" + p[i] + "'>");
    }
  }
  document.write("We're sorry. Your browser apparently does not render applets with the OBJECT tag.");
  document.write("</OBJECT>");
}

function w_embed(p) {
  document.write("<EMBED ");
  document.writeln("TYPE = 'application/x-java-applet' ");
  document.writeln("PLUGINSPAGE = 'http://www.mozilla.org/oji/' ");
  for (i in p) {
    if (p[i]!=null){
      document.writeln(i + " = '" + p[i] + "' ");
    }
  }
  document.writeln("></EMBED>");
}

function w_applet(p) {
  document.writeln("<applet height='" + p.height + "' width='" + p.width + "' ");
  document.writeln("codebase='" + p.codebase + "' ");
  document.writeln("code='" + p.code + "' ");
  document.writeln("id='" + p.id + "' ");
  document.writeln("name='" + p.name + "' ");
  document.writeln("align='" + p.align + "' ");
  document.writeln("archive='" + p.archive + "'>");

  // Because of a bug in Netscape 4, we don't want to
  // send the width and height to the PARAM tags.
  p.width = null;
  p.height = null;

  for (i in p) {
    if (p[i]!=null){
      document.writeln("<param name='"+i+"' value='" + p[i] + "'>");
    }
  }
  document.writeln("</applet>");
}
