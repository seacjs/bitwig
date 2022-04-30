loadAPI(16);
load ("Hardware.js");
load ("TrackHandler.js");

host.setShouldFailOnDeprecatedUse(true);
host.defineController("Solncev", "Launchcontrol Sea", "0.1", "5c5f23bb-cc7a-4986-af45-3ed550a5b3c4", "Vi");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["4- Launch Control XL"], ["4- Launch Control XL"]);

var hardware = null;
var trackHandler = null;
// var transport = null;




function init() 
{
   
   hardware = new LCXLHardware (host.getMidiOutPort (0), host.getMidiInPort (0), handleMidi);   
   trackHandler = new TrackHandler (host.createMainTrackBank (8, 0, 0), host.createCursorTrack ("MOXF_CURSOR_TRACK", "Cursor Track", 0, 0, true));
   // trackHandler.trackbank.getItemAt(2).select();
   // const testPos = trackHandler.cursorTrack.position();
      //   const testPos = trackHandler.cursorTrack
      // println('testPos: ' + testPos);
      
   
   // transport = host.createTransport ();   
   // transport.isPlaying ().addValueObserver (function (value)  
   // {
   //    println (value ? "Plaing..." : "Stopped.");
   //    if (value){
   //       host.getMidiOutPort(0).sendMidi(152, LCXL_BUTTON_1_1, 16);
   //    }else{
   //       host.getMidiOutPort(0).sendMidi(136, LCXL_BUTTON_1_1, 16)
   //    }      
   // });
   //   println ("MOXF initialized!");
}

function handleMidi (status, data1, data2)
{
     if (trackHandler.handleMidi (status, data1, data2))
      return;
      
}
function flush() {
   println('flush hello' );

   var cursorIndex = trackHandler.trackbank.cursorIndex();
   println('cursorIndex: ' + cursorIndex);

   var btns = [
      LCXL_BUTTON_1_1,
      LCXL_BUTTON_1_2,
      LCXL_BUTTON_1_3,
      LCXL_BUTTON_1_4,
      LCXL_BUTTON_1_5,
      LCXL_BUTTON_1_6,
      LCXL_BUTTON_1_7,
      LCXL_BUTTON_1_8,
    ];

   btns.forEach(btn => {
      host.getMidiOutPort(0).sendMidi(136, btn, 16);
   })

   for (i = 0; i < trackHandler.trackbank.getSizeOfBank (); i++)
   {
      var track = trackHandler.trackbank.getItemAt (i);
      var volume = track.volume().get();
      // println('volume: ' + volume);

      host.getMidiOutPort(0).sendMidi(volume > 0 ? 152 : 136, btns[i], 16);

      // check start

      // println('select: '+ select);
      // check end

   }

   if (trackHandler?.cursorTrack?.track) {
      println('Track Num: ' + trackHandler?.cursorTrack?.track);

   }
   println('---' + trackHandler.cursorTrack.mute().get());
 
}
function exit() {
   //println()
}