<template>
  <div :class="[classes.root, 'Timeline']">
    <div :class="classes.body">
      <div
        ref="timeline"
        class="timeline"
      >
        <v-row class="ml-0">
          <v-col
            v-for="status in timeline.visibleStatuses"
            :key="status.id"
            lg="3"
            md="4"
            sm="6"
            cols="12"
          >
            <prcard
              v-if="!excludedStatusIdsObject[status.id]"

              class="status-fadein"
              :status-id="status.id"
              :collapsable="true"
              :in-profile="inProfile"
              :profile-user-id="userId"
              :virtual-hidden="virtualScrollingEnabled && !statusesToDisplay.includes(status.id)"
            />
          </v-col>
        </v-row>
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
</template>

<script src="./prlist.js"></script>

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
