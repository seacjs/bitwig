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

//

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
   var color = 15;
   
    // Ставим наблюдатель на номер выбранного трека
   var cursorIndex = trackHandler.trackbank.cursorIndex().get();
   if (cursorIndex === -1 ) {
      trackHandler.trackbank.scrollPageForwards();
   }

   cursorIndex = cursorIndex === -1 ? 0 : cursorIndex;

   println('We choise cursor index: ' + cursorIndex + ' of: ' + trackHandler.trackbank.itemCount().get());

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

   // перебор треков из трек банка
   for (i = 0; i < trackHandler.trackbank.getSizeOfBank(); i++)
   {
      var track = trackHandler.trackbank.getItemAt (i);
      // громкость трека
      var volume = track.volume().get();

      // выкючаем трек с номером i
      host.getMidiOutPort(0).sendMidi(136, btns[i], 0);

      // включаем трек с номером i если он выбран в программе(cursorIndex)
      if (i < trackHandler.trackbank.itemCount().get()) {
         var del = 0;
         if (trackHandler.trackbank.itemCount().get() > 7) {
            del = (trackHandler.trackbank.itemCount().get() % 8) - 1;
            color = del === cursorIndex ? 16 : 15;
         } else {
            color = i === cursorIndex ? 16 : 15;
         }
         

         host.getMidiOutPort(0).sendMidi(del > cursorIndex ? 136 : 152, btns[i], del > cursorIndex ? 0 : color);
      }
      
   }

   if (trackHandler?.cursorTrack?.track) {
      println('Track Num: ' + trackHandler?.cursorTrack?.track);

   }
   println('---' + trackHandler.cursorTrack.mute().get());
 
}
function exit() {
   //println()
}