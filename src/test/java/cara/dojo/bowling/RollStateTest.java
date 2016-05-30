package cara.dojo.bowling;

import cara.dojo.bowling.RollEvents.RollEvent;
import com.googlecode.zohhak.api.Coercion;
import com.googlecode.zohhak.api.TestWith;
import com.googlecode.zohhak.api.runners.ZohhakRunner;
import org.fest.assertions.Assertions;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(ZohhakRunner.class)
public class RollStateTest {

  class RollResult {
    RollEvent rollEvent;
    int first;
    int second;

    void set(RollEvent rollEvent, int first, int second) {
      this.rollEvent = rollEvent;
      this.first = first;
      this.second = second;
    }

    boolean is(RollEvent rollEvent, int first, int second) {
      return this.rollEvent == rollEvent && this.first == first && this.second == second;
    }
  }

  @TestWith({"READY, 10, 0 , STRIKE", "READY, 5, 0 , FIRST", "FIRST, 5, 1 , SECOND", "FIRST, 5, 5 , SPARE"})
  public void transitionForNewRoll(RollState initialState, Integer pins, Integer first, RollState expectedState){
    // given
    // when
    RollState state = initialState.updateState(pins, first);

    // then
    Assertions.assertThat(state).isEqualTo(expectedState);
  }

  @TestWith({"STRIKE", "SPARE", "SECOND"})
  public void transitionToNewFrame(RollState endOfFrameState){
    // given
    RollEvents.getInstance().register(
            (event, first, second) -> {}
    );
    // when
    RollState state = endOfFrameState.updateState(0, 0);

    // then
    Assertions.assertThat(state).isEqualTo(RollState.READY);
  }

  @Coercion
  public RollState toRollState(String stringState) {
    return RollState.valueOf(stringState);
  }

  @Ignore
  @Test
  public void getStrikeEvent() {
    // given
    RollState state = RollState.READY;
    final RollResult rollResult = new RollResult();
    RollEvents.getInstance().register(
            (event, first, second) -> rollResult.set(event, first, second)
    );
    // when
    state = state.updateState(10, 0);
    state = state.updateState(0, 10);

    // then
    Assertions.assertThat(state).isEqualTo(RollState.READY);
    Assertions.assertThat(rollResult.is(RollEvent.STRIKE_EVENT, 10, 0)).isTrue();
  }

  @Ignore
  @Test
  public void getSpareEvent() {
    // given
    RollState state = RollState.READY;
    final RollResult rollResult = new RollResult();
    RollEvents.getInstance().register(
            (event, first, second) -> rollResult.set(event, first, second)
    );
    // when
    state = state.updateState(3, 0);
    state = state.updateState(7, 3);
    state = state.updateState(7, 3);

    // then
    Assertions.assertThat(state).isEqualTo(RollState.READY);
    Assertions.assertThat(rollResult.is(RollEvent.SPARE_EVENT, 3, 7)).isTrue();
  }

  @Ignore
  @Test
  public void getSecondWithRestEvent() {
    // given
    RollState state = RollState.READY;
    final RollResult rollResult = new RollResult();
    RollEvents.getInstance().register(
            (event, first, second) -> rollResult.set(event, first, second)
    );
    // when
    state = state.updateState(3, 0);
    state = state.updateState(4, 3);
    state = state.updateState(4, 3);

    // then
    Assertions.assertThat(state).isEqualTo(RollState.READY);
    Assertions.assertThat(rollResult.is(RollEvent.SECOND_WITH_REST_EVENT, 3, 4)).isTrue();
  }


}
