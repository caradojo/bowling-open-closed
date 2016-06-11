package cara.dojo.bowling;

import cara.dojo.bowling.FrameState.State;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.experimental.Accessors;

@Value
@Accessors(fluent = true)
@RequiredArgsConstructor
class Frame {
  private final State state;
  private final int first;
  private final int second;
  private final int score;

  Frame(State state, int first, int second) {
    this.state = state;
    this.first = first;
    this.second = second;
    this.score = 0;
  }

  boolean is(State state, int first, int second) {
    return this.state == state && this.first == first && this.second == second;
  }

  public Frame computeScore(Frame currentFrame) {
    int score = state.computeScore(this, currentFrame);
    return new Frame(state, first, second, score);
  }
}
