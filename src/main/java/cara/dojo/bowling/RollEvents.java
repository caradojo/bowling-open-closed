package cara.dojo.bowling;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static cara.dojo.bowling.RollEvents.RollEvent.SECOND_WITH_REST_EVENT;
import static cara.dojo.bowling.RollEvents.RollEvent.SPARE_EVENT;
import static cara.dojo.bowling.RollEvents.RollEvent.STRIKE_EVENT;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
class RollEvents {

  enum RollEvent {
    STRIKE_EVENT,
    SPARE_EVENT,
    SECOND_WITH_REST_EVENT;
  }

  @Getter
  private static final RollEvents instance = new RollEvents();

  private RollEventListener listener;

  void register(RollEventListener listener) {
    this.listener = listener;
  }

  void strike() {
    emit(STRIKE_EVENT, 10, 0);
  }

  void spare(int first, int second) {
    emit(SPARE_EVENT, first, second);
  }

  void secondWithRest(int first, int second) {
    emit(SECOND_WITH_REST_EVENT, first, second);
  }

  private void emit(RollEvent event, int first, int second) {
    listener.on(event, first, second);
  }
}
