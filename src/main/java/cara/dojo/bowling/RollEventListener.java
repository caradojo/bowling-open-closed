package cara.dojo.bowling;

import cara.dojo.bowling.RollEvents.RollEvent;

interface RollEventListener {
  void on(RollEvent event, int first, int second);
}
