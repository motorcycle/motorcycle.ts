import { VNode, div, h1, h4, li, span, ul } from '@motorcycle/mostly-dom'
import { length, map } from '167'

import { Friend } from '../../application'
import { Model } from './types'

export function view(model: Model): VNode {
  const { friends, searchView } = model

  const friendList = length(friends) === 0 ? 
    [ renderNoMatches() ] :
    map(friendView, friends)

  return div({ className: 'app' }, [
    ul({ className: 'friend-list' }, [searchView, ...friendList]),
  ])
}

function renderNoMatches() {
  return div({ className: 'app' }, [
    h1('No matches could be found, try again!')
  ])
}

function friendView(friend: Friend): VNode {
  const { id, name, username } = friend

  return li({ key: id }, [thumbnail(name, username)])
}

function thumbnail(name: string, username: string): VNode {
  return div({ className: 'friend-thumbnail' }, [
    h4([name, span({ className: 'username' }, [username])]),
  ])
}
