package org.cara.dojo.openclose.bowling;

import static ch.lambdaj.collection.LambdaCollections.with;

import java.util.List;

import org.fest.assertions.api.Assertions;
import org.junit.runner.RunWith;

import com.googlecode.zohhak.api.Coercion;
import com.googlecode.zohhak.api.TestWith;
import com.googlecode.zohhak.api.runners.ZohhakRunner;

import ch.lambdaj.collection.LambdaList;
import ch.lambdaj.function.convert.Converter;

@RunWith(ZohhakRunner.class)
public class FrameScoreTest {

  @TestWith(value={"[0, 0] ; 0", "[1, 5] ; 6", "[5, 4] ; 9"}, separator=";")
  public void frame_score_is_the_sum_of_two_pins(List<Integer> pinsGame, Integer expectedScore) {
    //Given
    FrameScore frame = new FrameScore();
    
    for (int pins : pinsGame) {
      frame = frame.roll(pins);
    }
    
    // When
    int score = frame.score();
    
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