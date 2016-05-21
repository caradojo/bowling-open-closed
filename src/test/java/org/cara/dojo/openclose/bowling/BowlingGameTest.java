package org.cara.dojo.openclose.bowling;

import org.fest.assertions.api.Assertions;
import org.junit.Test;

public class BowlingGameTest {

  @Test
  public void score_is_0_when_O_pins() {
    //Given
    BowlingGame bowling = new BowlingGame();
    bowling.roll(0);
    
    // When
    int score = bowling.score();
    
    // Then
    Assertions.assertThat(score).isEqualTo(0);
  }
}