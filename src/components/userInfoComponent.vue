<template>
  <div class="user-info">
    <h1>내 정보</h1>
    <div class="user_info-card-wrapper">
        <div class="user_info-card">
            <img class="user_info-card-profile_img" src="../asset/basicUserAvatar.svg"/>
            <div class="user_info-card-subInfo">
                <div class="user_info-card-name">이름: </div>
                <div class="user_info-card-email">이메일: </div>
                <div class="user_info-card-lastdate">날짜: </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import RepositoryFactory from "@/api/RepositoryFactory";
import storage from "@/utils/sessionStorage";

const userInfoRepository = RepositoryFactory.get("userInfo");

export default {
  name: "userInfoComponent",
  data() {
    return {
    };
  },
  methods: {
    initBind() {
    },
  },
};
</script>

<style lang="scss" scoped>
.user_info-card-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.user_info-card{
    display: flex;
    justify-content: left;
    max-width: 500px;
    width:100%;
    height: 200px;
    border:solid 0.1px black;
    flex-wrap: wrap;
    gap:20px;
    @media (max-width:450px){
        justify-content: center;
        height: 400px;
    }
    &-profile_img{
        align-self: center;
        width:200px;
        height:200px;
    }
    &-subInfo{
        align-self: center;
        text-align: center;
        font-size: 24px;
        text-align: left;
    }
}

</style>
