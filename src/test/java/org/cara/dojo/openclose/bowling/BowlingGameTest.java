package org.cara.dojo.openclose.bowling;

import static ch.lambdaj.collection.LambdaCollections.with;

import java.util.List;
import java.util.stream.Collectors;

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
  
  @TestWith(value={"[5, 3]     ; TwoRolls", 
   		   		   "[10, 5, 3] ; Strike, TwoRolls",
   		   		   "[4, 6]     ; TwoRolls",
   		   		   "[4, 6, 10] ; TwoRolls, Strike",
   		   		   "[10]       ; Strike"},
   		   		   separator=";")
  public void a_strike_is_when_the_player_knocks_down_all_10_pins_on_his_first_try(List<Integer> pinsGame, String frameName)
  {
	// Given
	BowlingGame bowling = new BowlingGame();
	for (int pins : pinsGame) {
		bowling.roll(pins);
	}
	  
	// When
	String actualFrameName= bowling.frames.stream().map(frame -> frame.name()).collect(Collectors.joining(", "));
	
	// Then
	Assertions.assertThat(actualFrameName).isEqualTo(frameName);
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