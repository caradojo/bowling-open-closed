package cara.dojo.bowling;

import cara.dojo.bowling.FrameState.State;
import lombok.AllArgsConstructor;
import lombok.Getter;

class Frame {
  private State state;
  @Getter
  private int first;
  @Getter
  private int second;
  @Getter
  private int score;

  Frame(State state, int first, int second) {
    this.state = state;
    this.first = first;
    this.second = second;
  }

  boolean is(State state, int first, int second) {
    return this.state == state && this.first == first && this.second == second;
  }

  public void computeScore(Frame currentFrame) {
    score = state.computeScore(currentFrame);
  }
}
