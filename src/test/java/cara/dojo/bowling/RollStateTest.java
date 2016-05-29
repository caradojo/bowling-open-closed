package cara.dojo.bowling;

import cara.dojo.bowling.RollEvents.RollEvent;
import org.fest.assertions.Assertions;
import org.junit.Test;

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

  @Test
  public void getStrikeState() {
    // given
    RollState state = RollState.READY;
    // when
    state = state.updateState(10, 0);

    // then
    Assertions.assertThat(state).isEqualTo(RollState.STRIKE);
  }

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
