package cara.dojo.bowling;

import org.fest.assertions.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class FrameStateMachineTest {

  private FrameStateMachine frameStateMachine;

  @Before
  public void setup() {
    frameStateMachine = new FrameStateMachine();
  }

  @Test
  public void strikeFrame(){
    // given
    // when
    Frames frames = frameStateMachine.run( new int[] { 10 } );
    // then
    Assertions.assertThat(frames).hasSize(1);
    Assertions.assertThat(frames.get(0).is(FrameState.State.STRIKE, 10, 0)).isTrue();
  }

  @Test
  public void spareFrame(){
    // given
    // when
    Frames frames = frameStateMachine.run( new int[] { 3, 7 } );
    // then
    Assertions.assertThat(frames).hasSize(1);
    Assertions.assertThat(frames.get(0).is(FrameState.State.SPARE, 3, 7)).isTrue();
  }

  @Test
  public void secondFrame(){
    // given
    // when
    Frames frames = frameStateMachine.run( new int[] { 3, 5 } );
    // then
    Assertions.assertThat(frames).hasSize(1);
    Assertions.assertThat(frames.get(0).is(FrameState.State.SECOND, 3, 5)).isTrue();
  }

  @Test
  public void secondSpareStrikeFrames(){
    // given
    // when
    Frames frames = frameStateMachine.run( new int[] { 3, 5, 4, 6, 10 } );
    // then
    Assertions.assertThat(frames).hasSize(3);
    Assertions.assertThat(frames.get(0).is(FrameState.State.SECOND, 3, 5)).isTrue();
    Assertions.assertThat(frames.get(1).is(FrameState.State.SPARE, 4, 6)).isTrue();
    Assertions.assertThat(frames.get(2).is(FrameState.State.STRIKE, 10, 0)).isTrue();
  }
}
