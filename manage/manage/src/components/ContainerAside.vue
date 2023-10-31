<template>
	<el-aside :width="$store.state.isCollapse ? '200px' : '64px'">
		<el-menu width="200px" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff"
			:collapse="!$store.state.isCollapse" :collapse-transition="false">
			<h3>{{ $store.state.isCollapse ? "后台管理" : "后台" }}</h3>
			<el-menu-item @click="clickMenu(item)" :index="item.path" v-for="item in nochildren()" :key="item.path">
				<el-icon>
					<location />
				</el-icon>
				<span>{{ item.label }}</span>
			</el-menu-item>
			<el-sub-menu :index="item.path" v-for="item in haschildren()" :key="item.path">
				<template #title>
					<el-icon>
						<location />
					</el-icon>
					<span>{{ item.label }}</span>
				</template>
				<el-menu-item-group @click="clickMenu(subitem)" :index="subitem.path"
					v-for="(subitem, subindex) in item.children" :key="subindex">{{ subitem.label }}
				</el-menu-item-group>
			</el-sub-menu>
		</el-menu>
	</el-aside>
</template>
<script>
	import {
		useRouter
	} from "vue-router";
	import {
		useStore
	} from 'vuex';
	export default {
		setup() {
			const router = useRouter();
			const store = useStore();
			// const list = [
			//   { path: "/User", name: "User", label: "用户管理" },
			//   {
			//     path: "/other",
			//     name: "other",
			//     label: "其它",
			//     children: [
			//       { path: "/other1", name: "other1", label: "其它1" },
			//       { path: "/other2", name: "other2", label: "其它2" },
			//     ],
			//   },
			// ];
			let menu = store.state.menu
			//没有children
			let nochildren = () => {
				return menu.filter((item) => !item.children);
			};
			//有children
			let haschildren = () => {
				return menu.filter((item) => item.children);
			};
			const clickMenu = (item) => {
				router.push({
					name: item.name,
				});
				store.commit('selectMenu', item)
			};
			return {
				nochildren,
				haschildren,
				clickMenu,
			};
		},
	};
</script>
<style scoped>
	.el-aside {
		height: 100%;
		background: #545c64;
	}

	.el-menu {
		border-right: none;
	}

	.el-menu h3 {
		height: 60px;
		color: white;
		text-align: center;
		line-height: 60px;
	}

	.el-menu-item-group {
		text-align: center;
		color: white;
	}
</style>
