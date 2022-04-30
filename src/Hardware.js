// Buttons
const LCXL_BUTTON_DEVICE  = 0x08; //105
const LCXL_BUTTON_MUTE    = 0x6A; //106
const LCXL_BUTTON_SOLO    = 0x10; //107
const LCXL_BUTTON_RECORD  = 0x10; //108 
const LCXL_BUTTON_UP      = 0x68; //104
const LCXL_BUTTON_DOWN    = 0x2D; //105
const LCXL_BUTTON_LEFT    = 0x10; //106
const LCXL_BUTTON_RIGHT   = 0x10; //107

// Track Focus Buttons
const LCXL_BUTTON_1_1     = 0x29; //41
const LCXL_BUTTON_1_2     = 0x2A; //42
const LCXL_BUTTON_1_3     = 0x2B; //43
const LCXL_BUTTON_1_4     = 0x2C; //44
const LCXL_BUTTON_1_5     = 0x39; //57
const LCXL_BUTTON_1_6     = 0x3A; //58
const LCXL_BUTTON_1_7     = 0x3B; //59
const LCXL_BUTTON_1_8     = 0x3C; //60

// Track Control Buttons
const LCXL_BUTTON_2_1     = 0x36; //73
const LCXL_BUTTON_2_2     = 0x37; //74 
const LCXL_BUTTON_2_3     = 0x38; //75
const LCXL_BUTTON_2_4     = 0x39; //76
const LCXL_BUTTON_2_5     = 0x3A; //89
const LCXL_BUTTON_2_6     = 0x3B; //90
const LCXL_BUTTON_2_7     = 0x3B; //91
const LCXL_BUTTON_2_8     = 0x3B; //92

//Faders
const LCXL_FADER_1        = 0x4D; //77
const LCXL_FADER_2        = 0x4E; //78
const LCXL_FADER_3        = 0x4F; //79
const LCXL_FADER_4        = 0x50; //80
const LCXL_FADER_5        = 0x51; //81
const LCXL_FADER_6        = 0x52; //82
const LCXL_FADER_7        = 0x53; //83 
const LCXL_FADER_8        = 0x54; //84

// Knobs Device
const LCXL_KNOB_DEVICE_1  = 0x4A; //49
const LCXL_KNOB_DEVICE_2  = 0x47; //50
const LCXL_KNOB_DEVICE_3  = 0x49; //51
const LCXL_KNOB_DEVICE_4  = 0x48; //52
const LCXL_KNOB_DEVICE_5  = 0x1C; //53
const LCXL_KNOB_DEVICE_6  = 0x1D; //54
const LCXL_KNOB_DEVICE_7  = 0x1E; //55
const LCXL_KNOB_DEVICE_8  = 0x1F; //56

// Knobs Pam
const LCXL_KNOB_PAN_1     = 0x1D; //29
const LCXL_KNOB_PAN_2     = 0x1E; //30
const LCXL_KNOB_PAN_3     = 0x1F; //31
const LCXL_KNOB_PAN_4     = 0x20; //32
const LCXL_KNOB_PAN_5     = 0x21; //33
const LCXL_KNOB_PAN_6     = 0x22; //34
const LCXL_KNOB_PAN_7     = 0x23; //35
const LCXL_KNOB_PAN_8     = 0x24; //36

// Knobs Send
const LCXL_KNOB_SEND_1     = 0x4A; //13
const LCXL_KNOB_SEND_2     = 0x47; //14
const LCXL_KNOB_SEND_3     = 0x49; //15
const LCXL_KNOB_SEND_4     = 0x48; //16

// Knob User
const LCXL_KNOB_USER_5     = 0x1C; //17
const LCXL_KNOB_USER_6     = 0x1D; //18 
const LCXL_KNOB_USER_7     = 0x1E; //19
const LCXL_KNOB_UZER_8     = 0x1F; //20


function LCXLHardware (outputPort, inputPort, inputCallback)
{
    this.portOut = outputPort;
    this.portIn  = inputPort;

    this.ledCache = initArray (-1, 128);

    this.portIn.setMidiCallback (inputCallback);
    this.noteIn = this.portIn.createNoteInput ("Yamaha LCXL", "91????", "81????", "B101??", "B140??", "E1????");

    // --- Example for inverting the keyboard
    //
    // var noteMap = initArray (-1, 128);
    // for (i = 0; i < 128; i++)
    //    noteMap[i] = 127 - i;
    // this.noteIn.setKeyTranslationTable (noteMap);
}

LCXLHardware.prototype.updateLED = function (note, isOn)
{
    var value = isOn ? 127 : 0;
    if (this.ledCache[note] == value)
        return;
    this.ledCache[note] = value;
    this.portOut.sendMidi (0x90, note, value);
}