package cara.dojo.bowling;

import cara.dojo.bowling.RollEvents.RollEvent;
import org.fest.assertions.Assertions;
import org.junit.Test;

public class RollStateMachineTest {

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

  private RollStateMachine rollStateMachine = new RollStateMachine();

  @Test
  public void getStrikeEvent() {
    // given
    final RollResult rollResult = new RollResult();
    RollEvents.getInstance().register(
            (event, first, second) -> rollResult.set(event, first, second)
    );
    // when
    rollStateMachine.run(new int[] { 10 });

    // then
    Assertions.assertThat(rollResult.is(RollEvent.STRIKE_EVENT, 10, 0)).isTrue();
  }

  @Test
  public void getSpareEvent() {
    // given
    final RollResult rollResult = new RollResult();
    RollEvents.getInstance().register(
            (event, first, second) -> rollResult.set(event, first, second)
    );
    // when
    rollStateMachine.run(new int[] { 3, 7});

    // then
    Assertions.assertThat(rollResult.is(RollEvent.SPARE_EVENT, 3, 7)).isTrue();
  }

  @Test
  public void getSecondWithRestEvent() {
    // given
    final RollResult rollResult = new RollResult();
    RollEvents.getInstance().register(
            (event, first, second) -> rollResult.set(event, first, second)
    );
    // when
    rollStateMachine.run(new int[] { 3, 4});

    // then
    Assertions.assertThat(rollResult.is(RollEvent.SECOND_WITH_REST_EVENT, 3, 4)).isTrue();
  }
}
