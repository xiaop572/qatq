<template>
  <div class="drawLucky">
    <img src="../assets/drawLuckyCaption.png" alt class="drawLuckyCaption" />
    <div class="winnerList">
      <span>恭喜用户林*C获得50元代金券</span>
    </div>
    <div class="turnTable">

    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.drawLucky {
  .drawLuckyCaption {
    width: 100%;
  }
  .winnerList{
    width: 5.53rem;
    height: 0.52rem;
    background: url('../assets/winnerListBg.png') no-repeat;
    background-size: cover;
    line-height: 0.52rem;
    text-align: center;
    margin:auto;
    position: relative;
    top: -0.5rem;
    font-size: 0.2rem;
    color: #fff;
}
.turnTable{
    width: 7.15rem;
    height: 7.15rem;
    background: url('../assets/turnTableBg.png') no-repeat;
    background-size: 100% 100%;
    margin: auto;
}
  overflow: hidden;
  background: linear-gradient(to bottom, #eb524e, #f97e4a, #dc684c);
}
</style>