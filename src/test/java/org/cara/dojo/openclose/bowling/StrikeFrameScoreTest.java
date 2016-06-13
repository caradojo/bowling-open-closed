package org.cara.dojo.openclose.bowling;

import org.fest.assertions.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.googlecode.zohhak.api.TestWith;
import com.googlecode.zohhak.api.runners.ZohhakRunner;

@RunWith(ZohhakRunner.class)
public class StrikeFrameScoreTest {

  @TestWith({"1"})
  public void listen_new_roll_until_one_rolls(Integer nbRolls) {
    //Given
    IFrameScore frame = new StrikeFrameScore();
    
    // When
    boolean shouldListen = frame.shouldListenRoll(nbRolls);
    
    // Then
    Assertions.assertThat(shouldListen).isTrue();
  }
  
  @TestWith({"2","3","4","8","10","23"})
  public void not_listen_new_roll_after_one_rolls(Integer nbRolls) {
    //Given
	  IFrameScore frame = new StrikeFrameScore();
    
    // When
    boolean shouldListen = frame.shouldListenRoll(nbRolls);
    
    // Then
    Assertions.assertThat(shouldListen).isFalse();
  }
  
  @Test
  public void my_name_is_Strike()
  {
	//Given
	IFrameScore frame = new StrikeFrameScore();
	
	// When
	String name = frame.name();
	
	// Then
	Assertions.assertThat(name).isEqualTo("Strike");
  }
}