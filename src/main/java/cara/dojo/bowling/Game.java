package cara.dojo.bowling;

import lombok.Getter;
import lombok.experimental.Accessors;

@Accessors(fluent = true)
class Game {

  private final FrameStateMachine frameStateMachine = new FrameStateMachine();

  @Getter
  private final int score;

  Game(int[] pins) {
    score = rolls(pins);
  }

  private int rolls(int[] pins) {
    Frames frames = frameStateMachine.run(pins);
    return frames.score();
  }
}
