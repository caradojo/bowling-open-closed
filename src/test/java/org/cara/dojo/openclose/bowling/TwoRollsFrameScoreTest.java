package org.cara.dojo.openclose.bowling;

import org.fest.assertions.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.googlecode.zohhak.api.TestWith;
import com.googlecode.zohhak.api.runners.ZohhakRunner;

@RunWith(ZohhakRunner.class)
public class TwoRollsFrameScoreTest {

  @TestWith({"1","2"})
  public void listen_new_roll_until_two_rolls(Integer nbRolls) {
    //Given
    IFrameScore twoRollsFrame = new TwoRollsFrameScore();
    
    // When
    boolean shouldListen = twoRollsFrame.shouldListenRoll(nbRolls);
    
    // Then
    Assertions.assertThat(shouldListen).isTrue();
  }
  
  @TestWith({"3","4","8","10","23"})
  public void not_listen_new_roll_after_two_rolls(Integer nbRolls) {
    //Given
	  IFrameScore twoRollsFrame = new TwoRollsFrameScore();
    
    // When
    boolean shouldListen = twoRollsFrame.shouldListenRoll(nbRolls);
    
    // Then
    Assertions.assertThat(shouldListen).isFalse();
  }
  
  @Test
  public void my_name_is_TwoRolls()
  {
	//Given
	IFrameScore twoRollsFrame = new TwoRollsFrameScore();
	
	// When
	String name = twoRollsFrame.name();
	
	// Then
	Assertions.assertThat(name).isEqualTo("TwoRolls");
  }
  
  @TestWith({"1", "2"})
  public void is_not_finished_until_two_rolls(Integer nbRolls) {
    //Given
    IFrameScore twoRollsFrame = new TwoRollsFrameScore();
    
    // When
    boolean isFinished = twoRollsFrame.isFinished(nbRolls);
    
    // Then
    Assertions.assertThat(isFinished).isFalse();
  }
  
  @TestWith({"3","4","8","10","23"})
  public void is_finished_after_two_rolls(Integer nbRolls) {
	  //Given
	  IFrameScore twoRollsFrame = new TwoRollsFrameScore();
	  
	  // When
	  boolean isFinished = twoRollsFrame.isFinished(nbRolls);
	  
	  // Then
	  Assertions.assertThat(isFinished).isTrue();
  }
}