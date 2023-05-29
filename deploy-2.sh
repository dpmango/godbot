yarn build
ssh user@23.88.122.94 << EOF
  cd godbot/front
  rm -rf build
EOF
scp -r /Users/admin/projects/godbot/build user@23.88.122.94:godbot/front/

