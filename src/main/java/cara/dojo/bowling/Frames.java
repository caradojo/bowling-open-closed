package cara.dojo.bowling;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Accessors(fluent = true)
class Frames {

  @Getter
  private final List<Frame> frames;

  Frames() {
    frames = new ArrayList<>();
  }

  Frames addFrame(Frame frame) {
    List<Frame> updatedList = new ArrayList<>();
    updatedList.addAll(frames);
    int count = updatedList.size();
    if (count != 0) {
      Frame updatedPreviousFrame = updatedList.get(count - 1).computeScore(frame);
      updatedList.remove(count - 1);
      updatedList.add(updatedPreviousFrame);
    }
    Frame toAppend = frame;
    if (frame.state() == FrameState.State.SECOND) {
      toAppend = frame.computeScore(null);
    }
    updatedList.add(toAppend);
    return new Frames(Collections.unmodifiableList(updatedList));
  }

  public int score() {
    return frames.stream()
            .mapToInt(frame -> frame.score())
            .sum();
  }
}
