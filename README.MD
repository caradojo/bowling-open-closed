# Zohhak memo

@RunWith(ZohhakRunner.class)

@Coercion
  public State toRollState(String stringState) {
    return State.valueOf(stringState);
  }

@TestWith({"10, 0, STRIKE", "5, 0, FIRST", "5, 1, SECOND", "5, 5, SPARE"})
