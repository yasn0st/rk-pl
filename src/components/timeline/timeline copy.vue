<template>
  <div class="fill-height">
    <v-navigation-drawer
      v-model="drawer2"
      width="300px"
      clipped
      :permanent="!$vuetify.breakpoint.xs"
      app
    >
      <v-list>
        <v-list-item
          link
          to="/praviykurs"
        >
          <v-list-item-icon>
            <v-img
              max-height="24px"
              max-width="24px"
              contain
              src="https://firebasestorage.googleapis.com/v0/b/svora-6f3df.appspot.com/o/rc.png?alt=media&token=d78085f4-bf3b-4cee-a0f0-5c192ffaa17a"
            />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Правый курс</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/statii"
        >
          <v-list-item-icon>
            <v-icon>mdi-book-open</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Статьи</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          to="/predpriyatiya"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Предприятия</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/sbori"
        >
          <v-list-item-icon>
            <v-icon>mdi-cash-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Сборы средств</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/podpisi"
        >
          <v-list-item-icon>
            <v-icon>mdi-lead-pencil</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Сборы подписей</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/sobitiya"
        >
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>События</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/prisoedinitsya"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Присоединиться</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          to="/spravka"
        >
          <v-list-item-icon>
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Ответы на вопросы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2 pb-0">
          <v-btn
            block
            depressed
            color="#cde6bb"
            @click="openlink('https://t.me/rakitov_kust')"
          >
            Телеграм
          </v-btn>
        </div>
        <div class="pa-2">
          <v-btn
            block
            depressed
            color="#f4c900"
            @click="openlink('https://www.subscribestar.com/yasnost')"
          >
            Поддержать
          </v-btn>
        </div>
        <v-list v-if="$vuetify.breakpoint.xs">
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
        <div :class="[classes.root, 'Timeline']">
          <v-toolbar>
            <TimelineMenu v-if="!embedded" />
            <button
              v-if="showLoadButton"
              class="button-default loadmore-button"
              @click.prevent="showNewStatuses"
            >
              {{ loadButtonString }}
            </button>
            <div
              v-else
              class="loadmore-text faint"
              @click.prevent
            >
              {{ $t('timeline.up_to_date') }}
            </div>
          </v-toolbar>
          <div :class="classes.body">
            <div
              ref="timeline"
              class="timeline"
            >
              <template v-for="statusId in pinnedStatusIds">
                <conversation
                  v-if="timeline.statusesObject[statusId]"
                  :key="statusId + '-pinned'"
                  class="status-fadein"
                  :status-id="statusId"
                  :collapsable="true"
                  :pinned-status-ids-object="pinnedStatusIdsObject"
                  :in-profile="inProfile"
                  :profile-user-id="userId"
                />
              </template>
              <template v-for="status in timeline.visibleStatuses">
                <conversation
                  v-if="!excludedStatusIdsObject[status.id]"
                  :key="status.id"
                  class="status-fadein"
                  :status-id="status.id"
                  :collapsable="true"
                  :in-profile="inProfile"
                  :profile-user-id="userId"
                  :virtual-hidden="virtualScrollingEnabled && !statusesToDisplay.includes(status.id)"
                />
              </template>
            </div>
          </div>
          <div :class="classes.footer">
            <div
              v-if="count===0"
              class="new-status-notification text-center panel-footer faint"
            >
              {{ $t('timeline.no_statuses') }}
            </div>
            <div
              v-else-if="bottomedOut"
              class="new-status-notification text-center panel-footer faint"
            >
              {{ $t('timeline.no_more_statuses') }}
            </div>
            <button
              v-else-if="!timeline.loading"
              class="button-unstyled -link -fullwidth"
              @click.prevent="fetchOlderStatuses()"
            >
              <div class="new-status-notification text-center panel-footer">
                {{ $t('timeline.load_older') }}
              </div>
            </button>
            <div
              v-else
              class="new-status-notification text-center panel-footer"
            >
              <FAIcon
                icon="circle-notch"
                spin
                size="lg"
              />
            </div>
          </div>
        </div>
      </v-container>
    </v-content>
  </div>
</template>

<script src="./timeline.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.Timeline {
  .loadmore-text {
    opacity: 1;
  }

  &.-blocked {
    cursor: progress;
  }
}

.timeline-heading {
  max-width: 100%;
  flex-wrap: nowrap;
  align-items: center;
  .loadmore-button {
    flex-shrink: 0;
  }
  .loadmore-text {
    flex-shrink: 0;
    line-height: 1em;
  }
}
</style>
