<template>
    <div class="register">
        <div class="title">
            <span>Register Learn-Log</span>
        </div>
        <a-form
            class="form"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            :model="registerFormState"
            :rules="registerRules"
            @finish="doRegister"
        >
            <a-form-item label="用户名" name="username">
                <a-input v-model:value="registerFormState.username" />
            </a-form-item>
            <a-form-item label="账号" name="account">
                <a-input v-model:value="registerFormState.account" />
            </a-form-item>
            <a-form-item label="密码" name="password">
                <a-input-password v-model:value="registerFormState.password" />
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 24 }">
                <div class="footer">
                    <a-button :loading="load" type="primary" html-type="submit">
                        注册
                    </a-button>
                    <a-button @click="router.push('/login/index')">
                        去登录
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
import { register } from "../../../api/user";
import { setUserInfo } from "../../../util";

const router = useRouter();

const load = ref(false);

const registerFormState = ref({
    account: "",
    password: "",
    username: "",
});

const registerRules = ref({
    account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
});

function doRegister({ account, password, username }) {
    load.value = true;
    register({ account, password, username })
        .then((res) => {
            message.success(res.msg + "，跳转登录页");
            setUserInfo(
                {
                    account,
                    password,
                    username: username,
                    login: false,
                },
                false
            );
            router.replace("/login/index");
        })
        .finally(() => (load.value = false));
}
</script>

<style scoped>
.register {
    width: 400px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 20px 5px #282828;
    display: flex;
    flex-direction: column;
}

.register > * {
    display: flex;
    justify-content: center;
    align-items: center;
}

.register .title {
    background-image: linear-gradient(45deg, #f31f4d, #5a4fec);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
}

.register .title span {
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
    width: 100%;
    display: flex;
    gap: 10px;
}

.footer > *:nth-child(1) {
    flex: 1;
}
</style>