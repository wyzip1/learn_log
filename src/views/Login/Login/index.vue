<template>
    <div class="login">
        <div class="title">
            <span>Login Learn-Log</span>
        </div>
        <a-form
            class="form"
            :model="loginFormState"
            :rules="loginRules"
            @finish="login"
        >
            <a-form-item label="账号：" name="account">
                <a-input v-model:value="loginFormState.account" />
            </a-form-item>
            <a-form-item label="密码：" name="password">
                <a-input-password v-model:value="loginFormState.password" />
            </a-form-item>
            <a-form-item>
                <div class="footer">
                    <a-button :loading="load" type="primary" html-type="submit">
                        登录
                    </a-button>
                    <a-button @click="router.push('/login/register')">
                        去注册
                    </a-button>
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>


<script setup>
import { message } from "ant-design-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { doLoign } from "../../../api/user";
import { getUserInfo, setUserInfo } from "../../../util";

const router = useRouter();
const userInfo = getUserInfo();

if (userInfo.login) router.replace("/");

const load = ref(false);

const loginFormState = ref({
    account: userInfo.account || "",
    password: userInfo.password || "",
});

const loginRules = ref({
    account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});

function login({ account, password }) {
    load.value = true;
    doLoign({ account, password })
        .then((res) => {
            message.success(res.msg);
            setUserInfo(
                {
                    id: res.data._id,
                    account,
                    password,
                    username: res.data.username,
                    login: true,
                },
                false
            );
            const token = res.data.token;
            localStorage.setItem("token", token);
            router.replace("/");
        })
        .finally(() => (load.value = false));
}
</script>

<style scoped>
.login {
    width: 400px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 20px 5px #282828;
    display: flex;
    flex-direction: column;
}

.login > * {
    display: flex;
    justify-content: center;
    align-items: center;
}

.login .title {
    background-image: linear-gradient(45deg, #f31f4d, #5a4fec);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
}

.login .title span {
    display: inline-block;
    padding: 0 55px 10px;
    border-bottom: 1px solid #673ab7;
    user-select: none;
}

.form {
    flex: 1;
    display: unset;
    padding: 20px 80px;
}

.footer {
    display: flex;
    gap: 10px;
}

.footer > *:nth-child(1) {
    flex: 1;
}
</style>