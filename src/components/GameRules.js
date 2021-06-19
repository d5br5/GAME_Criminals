const GameRules = ({mode})=>{

  return  <div className="gameRule">
    <h1>GAME {mode} RULE</h1>
    {
      mode === "1" ? <>
        <p className="gameRuleMargin">① 1 게임은 10 라운드로 구성됩니다.</p>
        <p className="gameRuleMargin">② 각 라운드마다 범죄자의 사진과 이름을 확인할 수 있습니다.</p>
        <p className="gameRuleMargin">③ 해당 범죄자의 죄목을 예상하여 정답을 선택합니다.</p>
        <p className="gameRuleMargin">④ 10 라운드가 종료된 후, 최종 성적에 맞게 POINT를 획득합니다.</p>
      </> : <>
        <p className="gameRuleMargin">① 1 게임은 5 라운드로 구성됩니다.</p>
        <p className="gameRuleMargin">② 각 라운드마다 두 범죄자의 사진과 이름을 확인할 수 있습니다.</p>
        <p className="gameRuleMargin">③ 두 범죄자 중 형량이 더 높을 것 같은 사람을 선택합니다.</p>
        <p className="gameRuleMargin">④ 형량이 동일하다면, 모두 정답처리 됩니다.</p>
        <p className="gameRuleMargin">⑤ 5 라운드가 종료된 후, 최종 성적에 맞게 POINT를 획득합니다.</p>
      </>

    }
  </div>
}

export default GameRules;