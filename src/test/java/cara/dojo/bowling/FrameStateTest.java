package cara.dojo.bowling;

import cara.dojo.bowling.FrameState.State;
import org.fest.assertions.Assertions;
import org.junit.Before;
import org.junit.Test;

public class FrameStateTest {

  private FrameState frameState;

  @Before
  public void setup() {
    frameState = new FrameState();
  }

  @Test
  public void emptyIsNotFinished(){
    // given
    // when
    // then
    Assertions.assertThat(frameState.isFinished()).isFalse();
  }

  @Test
  public void firstIsNotFinished(){
    // given
    // when
    frameState.roll(5);
    // then
    Assertions.assertThat(frameState.isFinished()).isFalse();
  }

  @Test
  public void strikeFrame(){
    // given
    // when
    frameState.roll(10);
    Frame frame = frameState.frame();
    // then
    Assertions.assertThat(frameState.isFinished()).isTrue();
    Assertions.assertThat(frame.is(State.STRIKE, 10, 0)).isTrue();
  }

  @Test
  public void spareFrame(){
    // given
    // when
    frameState.roll(3);
    frameState.roll(7);
    Frame frame = frameState.frame();
    // then
    Assertions.assertThat(frameState.isFinished()).isTrue();
    Assertions.assertThat(frame.is(State.SPARE, 3, 7)).isTrue();
  }

  @Test
  public void secondFrame(){
    // given
    // when
    frameState.roll(2);
    frameState.roll(3);
    Frame frame = frameState.frame();
    // then
    Assertions.assertThat(frameState.isFinished()).isTrue();
    Assertions.assertThat(frame.is(State.SECOND, 2, 3)).isTrue();
  }
}
