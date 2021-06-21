const GameRules = ({mode}) => {

  return <div className="gameRule">
    {mode === "1" ? <h1>죄목 추측</h1> : <h1>형량 대결</h1>}
    <h2>GAME RULE</h2>
    {
      mode === "1" ? <>
        <p className="gameRuleMargin">1. 1 게임은 10 라운드로 구성됩니다.</p>
        <p className="gameRuleMargin">2. 각 라운드마다 범죄자의 사진과 이름을 확인할 수 있습니다.</p>
        <p className="gameRuleMargin">3. 해당 범죄자의 죄목을 예상하여 정답을 선택합니다.</p>
        <p className="gameRuleMargin">4. 10 라운드가 종료된 후, 최종 성적에 맞게 POINT를 획득합니다.</p>
      </> : <>
        <p className="gameRuleMargin">1. 1 게임은 5 라운드로 구성됩니다.</p>
        <p className="gameRuleMargin">2. 각 라운드마다 두 범죄자의 사진과 이름을 확인할 수 있습니다.</p>
        <p className="gameRuleMargin">3. 두 범죄자 중 형량이 더 높을 것 같은 사람을 선택합니다.</p>
        <p className="gameRuleMargin">4. 형량이 동일하다면, 모두 정답처리 됩니다.</p>
        <p className="gameRuleMargin">5. 5 라운드가 종료된 후, 최종 성적에 맞게 POINT를 획득합니다.</p>
      </>

    }
  </div>

}

export default GameRules;