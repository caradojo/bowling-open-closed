package org.cara.dojo.openclose.bowling;

import static ch.lambdaj.collection.LambdaCollections.with;

import java.util.List;

import org.fest.assertions.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.googlecode.zohhak.api.Coercion;
import com.googlecode.zohhak.api.TestWith;
import com.googlecode.zohhak.api.runners.ZohhakRunner;

import ch.lambdaj.collection.LambdaList;
import ch.lambdaj.function.convert.Converter;

@RunWith(ZohhakRunner.class)
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

  @TestWith(value={"[0, 0, 0] ; 0", 
                   "[1, 1, 1, 1] ; 4", 
                   "[5, 4, 2, 1, 8, 1] ; 21"},
                   separator=";")
  public void score_is_the_sum_of_pins_knocked_down(List<Integer> pinsGame, Integer expectedScore) {
    // Given
    BowlingGame bowling = new BowlingGame();
    for (int pins : pinsGame) {
      bowling.roll(pins);
    }
    
    // When
    int score = bowling.score();
    
    // Then
    Assertions.assertThat(score).isEqualTo(expectedScore);
  }

  @Coercion
  public LambdaList<Integer> toList(String input) {
    String[] numbers = input.replace("[", "").replace("]", "").split(",");
    
    return with(numbers).convert(new Converter<String, Integer>() {
      
      public Integer convert(String from) {
        return Integer.parseInt(from.trim());
      }
    });
  }
}