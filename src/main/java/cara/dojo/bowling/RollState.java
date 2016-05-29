package cara.dojo.bowling;

enum RollState {
  READY {
    @Override
    RollState updateState(int pins, int firstPins) {
      return pins == 10 ? STRIKE : FIRST;
    }
  },
  FIRST {
    @Override
    RollState updateState(int pins, int firstPins) {
      return pins + firstPins == 10 ? SPARE : SECOND;
    }
  },
  SECOND {
    @Override
    RollState updateState(int pins, int firstPins) {
      notifier().secondWithRest(firstPins, pins);
      return READY;
    }
  },
  SPARE {
    @Override
    RollState updateState(int pins, int firstPins) {
      notifier().spare(firstPins, pins);
      return READY;
    }
  },
  STRIKE {
    @Override
    RollState updateState(int pins, int firstPins) {
      notifier().strike();
      return READY;
    }
  };

  /**
   * @param firstPins number of pins down at the first attempt
   * @return next state
   */
  abstract RollState updateState(int pins, int firstPins);

  private static RollEvents notifier() {
    return RollEvents.getInstance();
  }
}
