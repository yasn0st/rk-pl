<template>
  <div class="fill-height">
    <v-navigation-drawer
      v-model="drawer2"
      :permanent="!$vuetify.breakpoint.xs"
      app
      clipped
      width="300px"
    >
      <v-list style="height:76%">
        <v-list-item
          link
          to="/"
        >
          <v-list-item-icon>
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Назад</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item
          link
          @click="openlink('https://forms.gle/i3WgnfFHsQzbnXocA');drawer2=false;"
        >
          <v-list-item-icon>
            <v-icon>mdi-database-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Предложить предприятие</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <div
          v-if="pokazannie_metki.length>0"
          class="pt-2 pl-4 subtitle-1 font-weight-bold"
        >
          Выберите метки:
        </div>
        <v-container
          v-if="pokazannie_metki.length>0"
          class="pa-0 overflow-y-auto"
          style="height:100%"
        >
          <v-list class="pt-0 pl-4">
            <template v-for="(item, i) in pokazannie_metki">
              <v-list-item
                :key="i"
                style="min-height: 24px;"
                small
                @click="vibrannie_metki.push(item)"
              >
                <v-list-item-title>{{ item[0] }} ({{ item[1] }})</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-container>
      </v-list>

      <template
        v-if="$vuetify.breakpoint.xs"
        v-slot:append
      >
        <v-list>
          <v-divider />
          <v-list-item
            link
            @click="drawer2=false"
          >
            <v-list-item-icon>
              <v-icon>mdi-arrow-expand-left</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Свернуть</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-content :style="$vuetify.breakpoint.xs? '': 'padding-top:0px'">
      <v-container :class="$vuetify.breakpoint.xs? 'px-2': 'px-6'">
        <h2 @click="poyasnenie=!poyasnenie;">
          <v-icon
            class="mr-2 pb-1"
            color="#0a7d9a"
          >
            mdi-account-group
          </v-icon>
          <span
            style="border-bottom: 1px dashed gray;"
          >Русские национальные предприятия ({{ pokazannie_redpriyatiya.length }})</span>
        </h2>
        <v-card
          v-if="poyasnenie"
          outlined
          class="ml-3 mt-2"
          @click="poyasnenie=!poyasnenie"
        >
          <v-card-text
            class="pb-1 pt-2"
            v-html="poyasnenie_tekst.tekst"
          />
        </v-card>
        <v-chip
          v-for="(metka,i) in vibrannie_metki"
          :key="i"
          class="mt-1 mr-1"
          @click="vibrannie_metki.splice(i,1)"
        >
          {{ metka[0] }}
        </v-chip>
        <v-row class="ml-0">
          <v-col
            v-for="n in 12"
            v-if="vsepredpriyatiya.length === 0"
            :key="n"
            lg="3"
            md="4"
            sm="6"
            cols="12"
          >
            <v-skeleton-loader
              class="mx-auto"

              type="card"
            />
          </v-col>

          <v-col
            v-for="(pr,i) in pokazannie_redpriyatiya"
            :key="i"
            lg="3"
            md="4"
            sm="6"
            cols="12"
          >
            <v-card
              class="cardhov"
              height="100%"
              outlined
            >
              <div style="display: flex;  flex-flow: column;   height:100%">
                <div>
                  <router-link :to=" `/predpriyatiya/${pr.id}`">
                    <v-img
                      :src="pr.obraz"
                      aspect-ratio="1"
                      contain
                      style="width:100%"
                    >
                      <v-layout
                        slot="placeholder"
                        fill-height
                        align-center
                        justify-center
                        ma-0
                      >
                        <v-progress-circular
                          indeterminate
                          color="#0a7d9a"
                        />
                      </v-layout>
                    </v-img>
                    <v-divider />
                  </router-link>
                </div>
                <router-link
                  style="flex:1;"
                  class="cardlink"
                  :to=" `/predpriyatiya/${pr.id}`"
                >
                  <div>
                    <v-card-title
                      class="subtitle-1 font-weight-bold"
                      style="word-break: normal "
                    >
                      {{ pr.nazvanie }}
                    </v-card-title>
                    <v-card-text>{{ pr.kratkoe_opisanie }}</v-card-text>
                  </div>
                </router-link>
                <div>
                  <v-divider />

                  <v-card-text class="pa-2">
                    <div>
                      Место:
                      <v-chip
                        v-for="(mesto, nm) in pr.mesto"
                        :key="nm"
                        small
                        style="height:18px; margin-left:2px;"
                      >
                        {{ mesto }}
                      </v-chip>
                    </div>

                    <div>
                      Метки:
                      <v-chip
                        v-for="(metka, nm) in pr.metki"
                        :key="nm"
                        small
                        style="height:18px; margin-left:2px"
                        @click="vibrannie_metki.push([metka,0])"
                      >
                        {{ metka }}
                      </v-chip>
                    </div>
                  </v-card-text>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['drawer'],
  data: () => ({
    drawer2: false,
    vsepredpriyatiya: [],
    pokazannie_redpriyatiya: [],
    pokazannie_metki: [],
    vibrannie_metki: [],
    poyasnenie: false,
    poyasnenie_tekst: '',
    zagruzheniobrazy: false
  }),

  watch: {
    vsepredpriyatiya () {
      if (this.vsepredpriyatiya.length > 0) {
        let granica = this.vsepredpriyatiya.findIndex(pr => pr.nazvanie.slice(0, 1) === 'А')
        this.pokazannie_redpriyatiya = this.vsepredpriyatiya
          .slice(granica)
          .concat(this.vsepredpriyatiya.slice(0, granica))
        this.obnovitSpiski()
      }
    },

    drawer () {
      this.drawer2 = !this.drawer2
    },
    pokazannie_redpriyatiya () {
      this.obnovitSpiski()
    },
    vibrannie_metki () {
      this.pokazannie_redpriyatiya = []

      for (let i = 0; i < this.vsepredpriyatiya.length; ++i) {
        let pr = this.vsepredpriyatiya[i]
        let podhodit = 0
        for (let j = 0; j < this.vibrannie_metki.length; ++j) {
          let metka = this.vibrannie_metki[j]

          if (pr.metki.indexOf(metka[0]) > -1) {
            podhodit = podhodit + 1
          }
        }
        if (this.vibrannie_metki.length == podhodit) {
          this.pokazannie_redpriyatiya.push(pr)
        }
      }
    }
  },
  firestore () {
    return {
      vsepredpriyatiya: this.$firebase
        .collection('predpriyatiya')
        .orderBy('nazvanie'),
      poyasnenie_tekst: this.$firebase
        .collection('teksti')
        .doc('predpiyatiya-poyasnenie')
    }
  },

  methods: {
    obnovitSpiski () {
      let vm = this
      let vse_metki = []

      for (let i = 0; i < vm.pokazannie_redpriyatiya.length; ++i) {
        vse_metki = vse_metki.concat(vm.pokazannie_redpriyatiya[i].metki)
      }

      let counterMap = vse_metki.reduce(function (sameMap, item) {
        if (!sameMap[item]) {
          sameMap[item] = 1
        } else {
          sameMap[item]++
        }

        return sameMap
      }, {})

      let result = Object.keys(counterMap).map(function (key) {
        return [key, counterMap[key]]
      })

      result.sort(function (a, b) {
        if (a[1] < b[1]) {
          return 1
        }
        if (a[1] > b[1]) {
          return -1
        }
        // a должно быть равным b
        return 0
      })

      vm.pokazannie_metki = result

      // убираю метки, которые уже выбраны
      for (let i = 0; i < vm.vibrannie_metki.length; ++i) {
        for (let j = 0; j < vm.pokazannie_metki.length; ++j) {
          if (vm.vibrannie_metki[i][0] === vm.pokazannie_metki[j][0]) {
            vm.pokazannie_metki.splice(j, 1)
            break
          }
        }
      }
      // убираю метки, которые есть у всех показанных предприятий
      this.pokazannie_metki = this.pokazannie_metki.filter(
        metka => metka[1] < this.pokazannie_redpriyatiya.length
      )
    },
    openlink (arg) {
      window.open(arg, '_blank')
    }
  }
}
</script>

<style>
.cardhov:hover {
  background-color: #eeeeee;
}
.cardlink {
  text-decoration: none;
  color: #1f2020 !important;
}
.cardlink:hover {
  text-decoration: none;
  color: #1f2020 !important;
}
</style>
