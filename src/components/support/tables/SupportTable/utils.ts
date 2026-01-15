// Icons
import defbriefIcon from '@/assets/icons/support-type-icons/debriefing/debriefing.svg'
import defusingIcon from '@/assets/icons/support-type-icons/defusing/defusing.svg'
import familyIcon from '@/assets/icons/support-type-icons/family/family.svg'
import financesIcon from '@/assets/icons/support-type-icons/finances/finances.svg'
import referralIcon from '@/assets/icons/support-type-icons/referral/referral.svg'
import substanceAbuseIcon from '@/assets/icons/support-type-icons/substance-abuse/substance-abuse.svg'
import undisclosedIcon from '@/assets/icons/support-type-icons/undisclosed/undisclosed.svg'
import workIcon from '@/assets/icons/support-type-icons/work/work.svg'

// Types
import * as AppTypes from '@/context/App/AppTypes'

export const supportTypeIconMap = new Map<AppTypes.SupportType, string | undefined>([
  ['Debrief - External', defbriefIcon],
  ['Debrief - Internal', defbriefIcon],
  ['Defusing', defusingIcon],
  ['Family', familyIcon],
  ['Finances', financesIcon],
  ['Referral', referralIcon],
  ['Substance Use', substanceAbuseIcon],
  ['Undisclosed', undisclosedIcon],
  ['Work', workIcon],
  ['Other', undefined]
])

export const handleDateTimes = (support: AppTypes.SupportInterface) => {
  const start = new Date(support.startDateTime).toISOString()
  const end = new Date(support.endDateTime).toISOString()

  const startEndDateTimes = {
    start: {
      date: start.split('T')[0],
      time: start.split('T')[1].slice(0, -8)
    },
    end: {
      date: end.split('T')[0],
      time: end.split('T')[1].slice(0, -8)
    }
  }

  return startEndDateTimes
}