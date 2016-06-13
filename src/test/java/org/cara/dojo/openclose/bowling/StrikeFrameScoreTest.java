package org.cara.dojo.openclose.bowling;

import org.fest.assertions.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.googlecode.zohhak.api.TestWith;
import com.googlecode.zohhak.api.runners.ZohhakRunner;

@RunWith(ZohhakRunner.class)
public class StrikeFrameScoreTest {

  @TestWith({"1", "2", "3"})
  public void listen_new_roll_until_three_rolls(Integer nbRolls) {
    //Given
    IFrameScore strike = new StrikeFrameScore();
    
    // When
    boolean shouldListen = strike.shouldListenRoll(nbRolls);
    
    // Then
    Assertions.assertThat(shouldListen).isTrue();
  }
  
  @TestWith({"4", "5", "8", "10", "23"})
  public void not_listen_new_roll_after_three_rolls(Integer nbRolls) {
    //Given
	IFrameScore strike = new StrikeFrameScore();
    
    // When
    boolean shouldListen = strike.shouldListenRoll(nbRolls);
    
    // Then
    Assertions.assertThat(shouldListen).isFalse();
  }
  
  @Test
  public void my_name_is_Strike()
  {
	//Given
	IFrameScore strike = new StrikeFrameScore();
	
	// When
	String name = strike.name();
	
	// Then
	Assertions.assertThat(name).isEqualTo("Strike");
  }
  
  @TestWith({"1"})
  public void is_not_finished_until_one_roll(Integer nbRolls) {
    //Given
    IFrameScore strike = new StrikeFrameScore();
    
    // When
    boolean isFinished = strike.isFinished(nbRolls);
    
    // Then
    Assertions.assertThat(isFinished).isFalse();
  }
  
  @TestWith({"2","3","4","8","10","23"})
  public void is_finished_after_one_roll(Integer nbRolls) {
	  //Given
	  IFrameScore strike = new StrikeFrameScore();
	  
	  // When
	  boolean isFinished = strike.isFinished(nbRolls);
	  
	  // Then
	  Assertions.assertThat(isFinished).isTrue();
  }
  
}