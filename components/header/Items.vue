<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          <Icon class="h-8 w-8" name="flat-color-icons:settings" />
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-3 p-4">
            <li>
              <NavigationMenuLink>
                <span class="ml-2">Configurações</span>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
</script>