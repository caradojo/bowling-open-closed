package org.cara.dojo.openclose.bowling;

import org.fest.assertions.api.Assertions;
import org.junit.runner.RunWith;

import com.googlecode.zohhak.api.TestWith;
import com.googlecode.zohhak.api.runners.ZohhakRunner;

@RunWith(ZohhakRunner.class)
public class DefaultFrameTest {

  @TestWith({"1","2"})
  public void default_frame_should_listen_until_two_rolls(Integer nbRolls) {
    //Given
    DefaultFrame frame = new DefaultFrame();
    
    // When
    boolean shouldListen = frame.shouldListenRoll(nbRolls);
    
    // Then
    Assertions.assertThat(shouldListen).isTrue();
  }
  
}