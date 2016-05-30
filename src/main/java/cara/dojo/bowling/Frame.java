package cara.dojo.bowling;

import cara.dojo.bowling.FrameState.State;
import lombok.AllArgsConstructor;

@AllArgsConstructor
class Frame {
  private State state;
  private int first;
  private int second;

  boolean is(State state, int first, int second) {
    return this.state == state && this.first == first && this.second == second;
  }
}
