<template>
  <div class="user-info">
    <h1>내 정보</h1>
    <div class="user_info-card-wrapper">
        <div class="user_info-card">
            <img
              class="user_info-card-profile_img"
              :src="`${myImageSource}`"
              data-test="user-profileimg"
              />
            <div class="user_info-card-subInfo">
                <div class="user_info-card-name" data-test="user-name">이름: {{userName}}</div>
                <div class="user_info-card-email" data-test="user-email">이메일: {{userEmail}}</div>
            </div>
        </div>
    </div>
    <button
      class="logout-button"
      data-test="logout_button"
      @click="logoutButtonClick"
    >
    로그아웃
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import RepositoryFactory from "@/api/RepositoryFactory";

const { mapActions } = createNamespacedHelpers("Login");
const userInfoRepository = RepositoryFactory.get("userInfo");
const logoutRepository = RepositoryFactory.get("logout");

export default {
  name: "userInfoComponent",
  data() {
    return {
      // eslint-disable-next-line global-require
      defaultProfileImg: require("@/asset/basicUserAvatar.svg"),
      userName: "",
      userEmail: "",
      userProfileImage: "",
    };
  },
  methods: {
    ...mapActions(["initClearAuthToken"]),

    async logoutButtonClick() {
      const response = await logoutRepository.logout();

      if (response.status === 200) {
        // eslint-disable-next-line no-alert
        alert("정상적으로 로그아웃 되었습니다!");
        this.initClearAuthToken();
        this.$router.push("/login");
      } else {
        // eslint-disable-next-line no-alert
        alert(response.data.error.message);
      }
    },
  },
  computed: {
    myImageSource() {
      return this.userProfileImage ? this.userProfileImage : this.defaultProfileImg;
    },
  },
  async created() {
    const response = await userInfoRepository.getUserInfo();
    // 인증성공
    if (response.status === 200) {
      this.userName = response.data.name;
      this.userEmail = response.data.email;
      this.userProfileImage = response.data.profileImage;
    } else {
      // eslint-disable-next-line no-alert
      alert(response.data.error.message);
      this.$router.push("/login");
      this.initClearAuthToken();
    }
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
    @media (max-width:500px){
        justify-content: center;
        height: 400px;
    }
    &-profile_img{
        align-self: center;
        width:200px;
        height:200px;
    }
    &-subInfo{
        display: block;
        max-width: 250px;
        width:100%;
        align-self: center;
        text-align: center;
        font-size: 20px;
        text-align: left;
        .user_info-card-name{
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .user_info-card-email{
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }

    }
}
.logout-button{
  max-width:100px;
  width:100%;
  height:25px;
  background: black;
  color: white;
  border:solid 0.1px;
  border-radius: 10px;
  cursor: pointer;
}

</style>
