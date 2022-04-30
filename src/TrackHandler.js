function TrackHandler (trackbank, cursorTrack)
{
    this.trackbank = trackbank;
    this.cursorTrack = cursorTrack;
    this.selectedTrackIndex = 0;

    for (i = 0; i < this.trackbank.getSizeOfBank (); i++)
    {
        var track = this.trackbank.getItemAt (i);

        var 
        p = track.pan ();
        p.markInterested ();
        p.setIndication (true);

        p = track.volume ();
        p.markInterested ();
        p.setIndication (true);    

        p = track.select;
        p.markInterested ();

    }

    this.trackbank.followCursorTrack (this.cursorTrack);

    // this.trackbank.getTrack();

    // 

    this.cursorTrack.solo ().markInterested ();
    this.cursorTrack.mute ().markInterested ();
    // this.cursorTrack.select ().markInterested ();
  

    // function handleMidi  (status, data1, data2) {

    // }

  

}

TrackHandler.prototype.handleMidi = function (status, data1, data2)
{
     if (isChannelController(status)) // Pan Knobs //
    {
        switch (data1)
        {
            // Pan Knobs //

            case LCXL_KNOB_PAN_1:
                this.trackbank.getItemAt (0).pan ().set (data2, 128);
                return true;

            case LCXL_KNOB_PAN_2:
                this.trackbank.getItemAt (1).pan ().set (data2, 128);
                return true;

            case LCXL_KNOB_PAN_3:
                this.trackbank.getItemAt (2).pan ().set (data2, 128);
                return true;

            case LCXL_KNOB_PAN_4:
                this.trackbank.getItemAt (3).pan ().set (data2, 128);
                return true;

            case LCXL_KNOB_PAN_5:
                this.trackbank.getItemAt (4).pan ().set (data2, 128);
                return true;

            case LCXL_KNOB_PAN_6:
                this.trackbank.getItemAt (5).pan ().set (data2, 128);
                return true; 

            case LCXL_KNOB_PAN_7:
                this.trackbank.getItemAt (6).pan ().set (data2, 128);
                return true;
                
            case LCXL_KNOB_PAN_8:
                this.trackbank.getItemAt (7).pan ().set (data2, 128);
                return true;
                 
            case LCXL_BUTTON_UP:
                this.trackbank.scrollPageBackwards ();
                return true;
                
                default:
                return false;
           
        }
    }
    if (isNoteOn(status))  //Select Track Buttons
    {
        switch (data1)
        {
            // case LCXL_BUTTON_1_1:
            //     this.trackbank.getItemAt (0).select ();
            //     return true;

            case LCXL_BUTTON_1_2:
                this.trackbank.getItemAt (1).select ();
                return true;

            case LCXL_BUTTON_1_3:
                this.trackbank.getItemAt (2).select ();
                return true;        
            case LCXL_BUTTON_1_4:
                this.trackbank.getItemAt (3).select ();
                return true;
            
            case LCXL_BUTTON_1_5:
                this.trackbank.getItemAt (4).select ();
                return true;

            case LCXL_BUTTON_1_6:
                this.trackbank.getItemAt (5).select ();
                return true;
                
            case LCXL_BUTTON_1_7:
                this.trackbank.getItemAt (6).select ();
                return true;
            
            case LCXL_BUTTON_1_8:
                this.trackbank.getItemAt (7).select ();
                return true;

                default:
                return false;

            
            //Scroll Bank

            case LCXL_BUTTON_UP:
                this.trackbank.scrollPageBackwards ();
                return true;

            case LCXL_BUTTON_DOWN:
                    this.trackbank.scrollPageForwards ();
                    return true;
                
        }
    }    
    return false;    
}