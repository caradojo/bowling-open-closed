package cara.dojo.bowling;

import com.googlecode.zohhak.api.Coercion;
import com.googlecode.zohhak.api.TestWith;
import com.googlecode.zohhak.api.runners.ZohhakRunner;
import org.fest.assertions.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.Arrays;

@RunWith(ZohhakRunner.class)
public class FrameTest {

  @Coercion
  public Frame stringToFrame(String input) {
    String[] values = input.replace("[","").replace("]","").split(",");
    for (int i = 0; i < values.length; i++) {
      values[i] = values[i].trim();
    }
    FrameState.State state = FrameState.State.valueOf(values[0]);
    int firstPins = Integer.valueOf(values[1]);
    int secondPins = Integer.valueOf(values[2]);
    return new Frame(state, firstPins, secondPins);
  }

  @TestWith(value={
            "[STRIKE, 10, 0] ; [SECOND, 3, 4] ; 17",
            "[SECOND, 3, 4] ; [SECOND, 1, 1] ; 7",
            "[SECOND, 3, 4] ; [STRIKE, 10, 0] ; 7",
            "[SECOND, 3, 4] ; [SPARE, 4, 6] ; 7",
            "[SPARE, 3, 7] ; [SECOND, 3, 6] ; 13",
            "[SPARE, 3, 7] ; [STRIKE, 10, 0] ; 20",
            "[SPARE, 3, 7] ; [SPARE, 4, 6] ; 14"
          },
          separator = ";")
  public void buildScore(Frame previousFrame, Frame currentFrame, int expected) {
    // given
    // do
    previousFrame = previousFrame.computeScore(currentFrame);

    // then
    Assertions.assertThat(previousFrame.score()).isEqualTo(expected);
  }
}
