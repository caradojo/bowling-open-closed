package cara.dojo.bowling;

import com.googlecode.zohhak.api.Coercion;
import com.googlecode.zohhak.api.TestWith;
import com.googlecode.zohhak.api.runners.ZohhakRunner;
import org.fest.assertions.Assertions;
import org.junit.runner.RunWith;

@RunWith(ZohhakRunner.class)
public class GameTest {

  @Coercion
  public int[] stringToIntArray(String input) {
    String[] values = input.replace("[","").replace("]","").split(",");
    int[] ints = new int[values.length];
    for (int i = 0; i < values.length; i++) {
      ints[i] = Integer.parseInt(values[i].trim());
    }
    return ints;
  }

  @TestWith(value={
          "[10, 0, 0] ; 10",
          "[10, 3, 4] ; 24",
          "[3, 7, 3, 4] ; 20",
          "[3, 4, 3, 4] ; 14",
          "[3, 4, 10, 4, 6, 8, 1] ; 54",
          },
          separator = ";")
  public void game(int[] pins, int expected) {
    // given
    // do
    Game game = new Game(pins);

    // then
    Assertions.assertThat(game.score()).isEqualTo(expected);
  }
}
