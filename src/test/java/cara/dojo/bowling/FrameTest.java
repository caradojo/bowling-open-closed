package cara.dojo.bowling;

import com.googlecode.zohhak.api.Coercion;
import com.googlecode.zohhak.api.TestWith;
import com.googlecode.zohhak.api.runners.ZohhakRunner;
import org.fest.assertions.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(ZohhakRunner.class)
public class FrameTest {

    @Coercion
    public Frame stringToFrame(String input) {
        String[] values = input.replace("[","").replace("]","").split(",");
        return new Frame(FrameState.State.valueOf(values[0]), Integer.valueOf(values[1]), Integer.valueOf(values[2]));
    }

    @TestWith(value="[STRIKE, 10, 0] ; [SECOND, 3, 4] ; 17", separator = ";")
    public void buildScoreForStrike(Frame previousFrame, Frame currentFrame, int expected) {
        // given
        //Frame previousFrame = new Frame(previousState, prevFirst, prevSecond);
        //Frame currentFrame = new Frame(currentState, curFirst, curSecond);

        // do
        previousFrame.computeScore(currentFrame);

        // then
        Assertions.assertThat(previousFrame.getScore()).isEqualTo(expected);
    }
}
