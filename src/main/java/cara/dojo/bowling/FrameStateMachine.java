package cara.dojo.bowling;

class FrameStateMachine {

  Frames run(int [] pins) {
    Frames frames = new Frames();
    FrameState frameState;
    for (int i = 0; i < pins.length;) {
      frameState = new FrameState();
      do {
        frameState.roll(pins[i]);
        i++;
      } while(!frameState.isFinished());
      frames = frames.addFrame(frameState.frame());
    }
    return frames;
  }
}
